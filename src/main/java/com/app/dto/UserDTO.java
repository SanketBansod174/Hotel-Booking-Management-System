package com.app.dto;

import com.app.entities.Role;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString

public class UserDTO {

	private Integer id;
	private String name;

	private String mail;

	private String password;

	private String confirmpassword;

	private String phoneNumber;

	private Role userRole;

	private String jwt;

	private String city;

	private String state;

	private int zipcode;

	private String Country;

}
