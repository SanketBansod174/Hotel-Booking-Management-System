package com.app.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AuthenticationRequest;
import com.app.dto.AuthenticationResponse;
import com.app.dto.UserDTO;
import com.app.jwt_utils.JwtUtils;
import com.app.service.IUserService;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class UserSignupSignInController {

	@Autowired
	private AuthenticationManager authManager;
	// auto wire JwtUtils for sending signed JWT back to the clnt
	@Autowired
	private JwtUtils jwtUtils;
	@Autowired
	private IUserService userService;

	// add end point for user registration
	@PostMapping("/signup")
	public ResponseEntity<?> userRegistration(@RequestBody @Valid UserDTO user) {
		System.out.println("in user reg " + user);
		return ResponseEntity.ok(userService.saveUserDetails(user));
	}

	// add end point for user authentication
	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@RequestBody AuthenticationRequest request) {
		System.out.println("in auth " + request);
		try {
			System.out.println("------------------");
			System.out.println("-------- Email : " + request.getEmail() + "     " + request.getPassword());

			Authentication authenticate = authManager
					.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
			// => successful authentication : create JWT n send it to the clnt in the
			// response.
			System.out.println("auth success " + authenticate);

			UserDTO userdto = userService.getUserByEmail(request.getEmail());
			userdto.setPassword(null);
			userdto.setJwt(jwtUtils.generateJwtToken(authenticate));
			System.out.println(userdto);
			// return ResponseEntity.ok(new
			// AuthenticationResponse(jwtUtils.generateJwtToken(authenticate)));
			return ResponseEntity.ok(userdto);
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException("User authentication Failed", e);
		}

	}

//	
//	@PostMapping("/otp/update")
//	public ResponseEntity<?> updatePasswordByOTP(@RequestBody OTPVerifyUpdatePassword update)
//	{
//		System.out.println(update.getDestEmail()+"    "+update.getOtp()+"    "+update.getNewPass());
//		userService.updateUserPasswordByOTP(update);
//		return ResponseEntity.status(HttpStatus.OK).body("Password updated successfully"); 
//	}

}
