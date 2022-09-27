package com.app.entities;

import java.time.LocalDate;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.UniqueConstraint;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Setter
@Getter

@Table(name = "booking", uniqueConstraints = @UniqueConstraint(columnNames = { "user_Id", "room_Id", "payment_id" }))
@ToString(exclude = { "hotelId", "userId", "roomId", "paymentId" })
@NoArgsConstructor
public class Booking extends BaseEntity {
	@ManyToOne //(fetch = FetchType.LAZY)
	@JoinColumn(name = "hotel_id")

	private Hotel hotelId;

	@ManyToOne//(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User userId;

	@ManyToOne //(fetch = FetchType.LAZY)
	@JoinColumn(name = "room_id")
	private Room roomId;

	@OneToOne
	@JoinColumn(name = "payment_id")
	private Payment paymentId;
	@Column(length = 30)
//	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate dateForm;
	@Column(length = 30)
	@DateTimeFormat(pattern = "yyyy-MM-dd")
//	@Temporal(TemporalType.DATE)
	private LocalDate dateTo;
	

}
