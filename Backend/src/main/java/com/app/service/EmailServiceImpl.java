package com.app.service;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dto.BookingDTO;
import com.app.entities.Hotel;

@Service
@Transactional
public class EmailServiceImpl implements IEmailService {

	
	@Autowired 
	private JavaMailSender javaMailSender;

	 

	@Override
	public String sendBillEmail(String emailer,String name,double amount,Hotel hotel,BookingDTO book) {
		SimpleMailMessage message=new SimpleMailMessage();
		message.setFrom("sanketbansod98.sb@gmail.com");
		message.setTo(emailer);
		message.setSubject("Payment Recipet");
		message.setText("Thanks for using our services Mr."+name+"\n Your Total Bill is  "+amount+""
				+ "\n \n You Haved Successfully Booked Room At "
				+ "\n \n \n ===================="+hotel.getHotelName().toUpperCase()+"====================  \n"
				+ "\n You have reserve room from "+book.getDateForm()+"  To "+book.getDateTo()+" \n"
				+ " \n Room Number are  "+ Arrays.toString(book.getRoomNumber())+"  \n"
				+ "\n Address : "+hotel.getHotelName()+","+hotel.getCity()+","+hotel.getState()+",India \n " 
				+ "\n \n \n For Further Contact \n  Email:"+hotel.getEmail()+" \n  "
				+ "Phone Number:"+hotel.getPhoneNumber());
		javaMailSender.send(message);
	
		return "Mailed the bill";
	}

	@Override
	public String sendOTPEmail(String emailer) {
		// TODO Auto-generated method stub
		return null;
	}

}
