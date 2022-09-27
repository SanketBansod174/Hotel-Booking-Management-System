package com.app.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.app.entities.User;

public class UserDetailsImpl implements UserDetails {
	private User user;

	public UserDetailsImpl() {
		// TODO Auto-generated constructor stub
	}

	// populating UserDetails object(spring sec object) from loaded user details
	// from DB
	public UserDetailsImpl(User user) {
		super();
		this.user = user;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		System.out.println("get authorities "+user.getUserRole());
//		return user.getUserRole().stream().map(r -> new SimpleGrantedAuthority(r.getUserRole().name()))
//				.collect(Collectors.toList());
		ArrayList<SimpleGrantedAuthority> list=new ArrayList<>();
		list.add(new SimpleGrantedAuthority(user.getUserRole().toString()));
		return list;
		
	}

	@Override
	public String getPassword() {
		System.out.println("get pwd");
		return user.getPassword();
	}

	@Override
	public String getUsername() {
		System.out.println("getting username");
		// TODO Auto-generated method stub
		return user.getName();
		

	}
	
	
	

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}

}
