package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@NoArgsConstructor
@Table(name = "hotel")
public class Hotel extends BaseEntity {


	@Column(length = 30)
	private String hotelName;
	@Column(length = 30)
	private String city;
	@Column(length = 30)
    private String state;
    private String phoneNumber;
	@Column(length = 30,unique = true)
	private String email;
	@Column(length = 30)
	@Enumerated(EnumType.STRING)
    private HotelType type;
	@Column(length = 500)
    private String description;
	@Column(length = 50)
    private String title;
	private String imagesPath;
	@Column(length = 50)
	private int rating ;
	@Column(length = 50)
	private int prices;
	@Column(length = 20)
	private boolean available; 
	
	
}
