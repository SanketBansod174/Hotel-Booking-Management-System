package com.app.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.app.filters.JwtRequestFilter;

@SuppressWarnings("deprecation")
@EnableWebSecurity 
@Configuration 
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	private JwtRequestFilter jwtFilter;

	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
			auth.userDetailsService(userDetailsService);
	}

	// for configuring authorization , override below method
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		System.out.println(3);
		// specify our own config
		// enable cors n disable CSRF
		http.cors().and().csrf().disable().

				authorizeRequests()// authorize all requests

				// always start with most restrictive of the patterns at the top n then go on to
				// lesser restrictive patterns
				// NOTE : argument of hasRole should NOT start with "ROLE_" as this is
				// automatically inserted.
				.antMatchers("/booking/**").hasRole("ADMIN").
				antMatchers("/user/**").hasRole("USER").
				antMatchers("/room/**").hasRole("USER").
			//	antMatchers("/api/payment").hasRole("USER").
				
				antMatchers("/api/hotel/**").permitAll().
			//	antMatchers("/api/**").permitAll().
				
//				antMatchers("/api/employees/**").hasRole("ADMIN").
			//	antMatchers("/student/**").hasRole("STUDENT")
		//		.antMatchers("/faculty/**").hasRole("FACULTY")
				// .antMatchers("/","static/js","static/css").permitAll()
				antMatchers("/","/email/**","/swagger*/**","/v3/api-docs/**", "/api/**").permitAll().
				//allow any HTTP OPTIONS request (which is typically a pre flight request coming from react like
				//front end : it's not required for testing it with postman
				antMatchers(HttpMethod.OPTIONS, "/**").permitAll().
				
				and().			
				// To tell Spring Security NEVER create an HttpSession & use HttpSession to obtain the
				// SecurityContext
				sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		// adding custom jwt filter before a filter for processing an authentication
		// form submission.
		http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

	}

	@Bean
	public PasswordEncoder encoder() {
		System.out.println(2);
		return new BCryptPasswordEncoder();
	}
	
	@Override
	@Bean
	public AuthenticationManager authenticationManagerBean() throws Exception {

		return super.authenticationManagerBean();
	}

}
