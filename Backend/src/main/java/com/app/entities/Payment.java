package com.app.entities;

import java.time.LocalDate;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter

@Setter
@Entity
@ToString
@Table(name = "payment")
@NoArgsConstructor
public class Payment extends BaseEntity {

	@Column(length = 30)
	@DateTimeFormat(pattern = "yyyy-MM-dd")
//	@Temporal(TemporalType.DATE)
	private LocalDate date;
	@Column(length = 30)
	private String paymentType;
	@Column(length = 30)
	private double amount;

	private String cardHolderName;

	private double cardNumber;

}
