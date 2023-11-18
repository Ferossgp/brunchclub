// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title BrunchClub
 * @dev Brunch Club is a contract that implements the Coffe Chat like matching.
 * It allows users to match with other users and have a 1:1 chat with them.
 * User who join the chat receive XP as a bonus, while missing it results in a penalty.
 * User can reject a match and get a different match. Maximum 3 rejections per epoch.
 *
 * For a match to be valid, both users need to accept it.
 *
 * A epoch is a week, and user can only match once per epoch.
 *
 * When a user is not able to attend, they can skip the epoch to avoid penalties.
 *
 * The match making is done externally to levergare ML for better matchin.
 * Then all matches are added to the contract by the owner.
 */
contract BrunchClub {
  address public owner;
  uint256 public epoch;

  struct User {
    address user;
    uint256 xp;
  }

  struct Match {
    address user1;
    address user2;
    uint256 epoch;
    bool accepted;
  }

  event MatchCreated(address indexed user1, address indexed user2);
  event MatchConfirmed(address indexed user1, address indexed user2);
  event MatchRejected(address indexed user1, address indexed user2);
  event NewUser(address indexed user);

  Match[] public matches;
  mapping(address => mapping(address => bool)) public accepted;
  mapping(address => mapping(uint256 => bool)) public skippedEpoch;
  mapping(address => User) public users;

  constructor() {
    owner = msg.sender;
    epoch = 0;
  }

  function addMatch(address user1, address user2) public {
    require(msg.sender == owner, 'Only owner can add matches');
    matches.push(Match(user1, user2, epoch, false));
    emit MatchCreated(user1, user2);
  }

  function getMatches() public view returns (Match[] memory) {
    return matches;
  }

  function incrementEpoch() public {
    require(msg.sender == owner, 'Only owner can bump epoch');
    epoch += 1;
  }

  function setOwner(address _owner) public {
    require(msg.sender == owner, 'Only owner can set owner');
    owner = _owner;
  }

  function acceptMatch(address _user) public {
    if (accepted[_user][msg.sender]) {
      for (uint256 i = 0; i < matches.length; i++) {
        if (
          (matches[i].user1 == msg.sender && matches[i].user2 == _user) ||
          (matches[i].user1 == _user && matches[i].user2 == msg.sender)
        ) {
          matches[i].accepted = true;
        }
      }
      // Reset in case the same user mach again in the future
      accepted[msg.sender][_user] = false;

      emit MatchConfirmed(msg.sender, _user);
    } else {
      accepted[msg.sender][_user] = true;
    }
  }

  /**
   * @dev Reject a match. User can reject up to 3 matches per epoch.
   * @param _user The user to reject the match with.
   *
   * Remove the Match from the match list so we can generate new matches for both users
   */
  function rejectMatch(address _user) public {
    for (uint256 i = 0; i < matches.length; i++) {
      if (
        (matches[i].user1 == msg.sender && matches[i].user2 == _user) ||
        (matches[i].user1 == _user && matches[i].user2 == msg.sender)
      ) {
        matches[i] = matches[matches.length - 1];
        matches.pop();
        emit MatchRejected(msg.sender, _user);
      }
    }
  }

  function skipEpoch(uint256 _epoch) public {
    skippedEpoch[msg.sender][_epoch] = true;
  }

  function register() public {
    require(users[msg.sender].user == address(0), 'User already registered');
    users[msg.sender] = User(msg.sender, 0);
    emit NewUser(msg.sender);
  }
}