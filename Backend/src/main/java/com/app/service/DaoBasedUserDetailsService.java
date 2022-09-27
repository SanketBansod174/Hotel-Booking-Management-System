package com.app.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.app.dao.UserRepository;
import com.app.entities.User;

@Service
public class DaoBasedUserDetailsService implements UserDetailsService {
	@Autowired
	private UserRepository userRepo;

	/*
	 * o.s.s.c.userdetails.UserDetails : represents core user information. It stores
	 * user information which is later encapsulated into Authentication object. This
	 * allows non-security related additional user information (eg : email
	 * addresses,telephone numbers ) to be stored in a convenient location.
	 * 
	 */
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		System.out.println("in load user " +email);
	
		Optional<User> optional = userRepo.findByMail(email);
		if(optional.isEmpty()) {
			optional = userRepo.findByName(email);
		}
	//	Optional<User> optional = userRepo.findByMail(email);
		
		System.out.println("=========>"+optional);
		User user = optional
				.orElseThrow(() -> new UsernameNotFoundException("User With Email  " +email + " not found!!!"));
		return new UserDetailsImpl(user);
	}

}
