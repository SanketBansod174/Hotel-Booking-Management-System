package com.app.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.UserRepository;
import com.app.dto.UserDTO;
import com.app.entities.Role;
import com.app.entities.User;

@Service
@Transactional
public class UserServiceImpl implements IUserService {
	@Autowired
	private UserRepository userRepo;
	@Autowired
	private ModelMapper mapper;
	@Autowired
	private PasswordEncoder encoder;

	@Override
	public List<User> getAllUserDetails() {

		List<User> list = userRepo.findAll();
//		ArrayList<User> listDTO = new ArrayList<User>();
//		for (User user : list) {
//			user.setPassword(null);
//			listDTO.add(user);
//		}

		return list;
	}

	@Override
	public UserDTO saveUserDetails(UserDTO userdto) {

		User user = mapper.map(userdto, User.class);
		user.setPassword(encoder.encode(userdto.getPassword()));
		user.setUserRole(Role.valueOf("ROLE_USER"));
		User persistanceUser = userRepo.save(user);
		UserDTO persistUser = mapper.map(persistanceUser, UserDTO.class);
		persistUser.setPassword(null);
		return persistUser;
	}

	@Override
	public UserDTO getUserDetails(int user) {

		User persistanceUser = userRepo.getReferenceById(user);

		return mapper.map(persistanceUser, UserDTO.class);
	}

	@Override
	public UserDTO getUserByEmail(String userEmail) {

		Optional<User> optional = userRepo.findByMail(userEmail);

		User user = optional
				.orElseThrow(() -> new UsernameNotFoundException("User With Email  " + userEmail + " not found!!!"));

		return mapper.map(user, UserDTO.class);
	}

	@Override
	public String deleteUser(int userId) {
		String mesg = "Deletion of user failed";

		if (userRepo.existsById(userId)) {
			userRepo.deleteById(userId);
			mesg = "user  deleted successfully";
		}

		return mesg;
	}

	@Override
	public UserDTO updateUserDetails(UserDTO userdto) {
		User user = mapper.map(userdto, User.class);
		Optional<User> users = userRepo.findById(userdto.getId());
		if (users.isPresent()) {
			User updatedUser = userRepo.save(user);

			return mapper.map(updatedUser, UserDTO.class);
		}
		return null;
	}

}
