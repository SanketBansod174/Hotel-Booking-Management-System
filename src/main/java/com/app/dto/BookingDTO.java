package com.app.dto;

import java.time.LocalDate;

import com.app.entities.BaseEntity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;



@Setter
@Getter
@ToString
@NoArgsConstructor

public class BookingDTO extends BaseEntity {
	private int userId;
	private int hotelId;

	private int roomNumber[];

	private int total;

	private LocalDate dateForm;

	private LocalDate dateTo;
	
	private String cardHolderName;
	
	private double cardNumber;

	


}
