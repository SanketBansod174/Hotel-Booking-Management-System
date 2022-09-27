package com.app.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.UserDTO;
import com.app.entities.User;
import com.app.service.IUserService;

@RestController
@RequestMapping("/api/user")
@CrossOrigin
@Validated
public class UserController {
	@Autowired
	private IUserService userService;

	public UserController() {
		System.out.println("in ctor of " + getClass());
	}

	// return all User
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping
	public ResponseEntity<?> listAllUser() {
		System.out.println("in list user");
		List<User> list = userService.getAllUserDetails();
		if (list.isEmpty())
			return new ResponseEntity<>("Empty user List !!!!", HttpStatus.BAD_REQUEST);
		return new ResponseEntity<>(list, HttpStatus.OK);
	}

	// add user details
	@PostMapping
	public ResponseEntity<UserDTO> saveUserDetails(@RequestBody @Valid UserDTO user) {
		return new ResponseEntity<>(userService.saveUserDetails(user), HttpStatus.CREATED);
	}

	// get particular user details
	@GetMapping("/{id}")
	public ResponseEntity<?> getUserDetails(@PathVariable int id) {
		UserDTO user = userService.getUserDetails(id);
		return ResponseEntity.ok(user);

	}

	// delete particular user details
//	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/{id}")
	public String deleteUser(@PathVariable int id) {
		return userService.deleteUser(id);
	}

	// edit particular hotel details
	@PutMapping
	public ResponseEntity<?> updateUserDetails(@RequestBody @Valid UserDTO user) {
		return ResponseEntity.ok(userService.updateUserDetails(user));
	}

}
