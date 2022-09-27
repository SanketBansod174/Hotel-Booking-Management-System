package com.app.entities;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@Getter

@Setter
@Entity
@Table(name="room")
@NoArgsConstructor
@ToString(exclude = {"hotelId"})
public class Room extends BaseEntity {
	
	
	@ManyToOne //(fetch = FetchType.LAZY)
	@JoinColumn(name="hotel_id")
//	@JsonIgnore
//	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	private Hotel hotelId;
	@Column(length = 30)
	@Enumerated(EnumType.STRING)
	private RoomType roomType;
	@Column(length = 30)
	private int roomNumber;
	@Column(length = 300)
	private String description;
//	@Column(length = 30)
//	@DateTimeFormat(pattern = "yyyy-MM-dd")
//	private LocalDate bookDate;
//	private String roomImages;
//	@Transient
//	private byte[] image;
	private boolean available;

	private int maxGuest;
	
	private int prices;
	private String title;

}
