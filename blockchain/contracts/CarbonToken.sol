// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CarbonToken is ERC20, Ownable {
    mapping(uint256 => TokenAllocation) public allocations;
    uint256 public allocationCount;

    struct TokenAllocation {
        uint256 amount;
        uint256 expiresAt;
        bool exists;
    }

    constructor() ERC20("Veridian Carbon Credit", "VCC") Ownable(msg.sender) {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function transferWithExpiry(address to, uint256 amount, uint256 durationInDays) public onlyOwner {
        _transfer(msg.sender, to, amount);
        
        allocationCount++;
        allocations[allocationCount] = TokenAllocation({
            amount: amount,
            expiresAt: block.timestamp + (durationInDays * 1 days),
            exists: true
        });
    }

    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }
}
