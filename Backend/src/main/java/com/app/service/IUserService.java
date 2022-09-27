package com.app.service;

import java.util.List;

import com.app.dto.UserDTO;
import com.app.entities.User;

public interface IUserService {

	List<User> getAllUserDetails();
	UserDTO saveUserDetails(UserDTO user);
	UserDTO getUserDetails(int user);
	String deleteUser(int user);
	UserDTO	updateUserDetails(UserDTO user);
	UserDTO getUserByEmail(String userEmail);
}
