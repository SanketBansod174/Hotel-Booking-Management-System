package com.app.entities;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@Entity
@ToString
@NoArgsConstructor
@Table(name = "user")
public class User extends BaseEntity {

	@Column(length = 30)
	private String name;
	@Column(length = 30,unique = true)
	private String mail;
	
	private String password;
	@Transient        //=> skip from persistence( no col.)
	private String confirmPassword;
	@Column(length = 30,unique = true)
	private String phoneNumber;

	@Enumerated(EnumType.STRING) 
	@Column(length = 20,name="user_role")
	private Role userRole;
	
	@Column(length = 30)
	private String city;
	@Column(length = 30)
	private String state;
	@Column(length = 30)
	private int zipcode;
	@Column(length = 30)
	private String Country;
	   
	
}
