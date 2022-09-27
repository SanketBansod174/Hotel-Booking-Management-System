package com.app.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.User;

public interface UserRepository extends JpaRepository<User,Integer> {

	Optional<User> findByMail(String email);
	
	Optional<User> findByName(String email);
	
//	void deleteByName(String name);
//	
//	Boolean existsByName(String name);
}