package com.app.entities;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.persistence.UniqueConstraint;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter

@Setter
@Entity
@ToString
@NoArgsConstructor

@Table(uniqueConstraints = { @UniqueConstraint(columnNames = { "hotelId", "imagePath" }) }, name = "roomImage")

public class RoomImage extends BaseEntity {

	private Integer hotelId;
	private String imagePath;
	@Transient
	private byte[] image;

	public RoomImage(Integer hotelId, String imagePath) {
		this.hotelId = hotelId;
		this.imagePath = imagePath;
	}

	public RoomImage(Integer hotelId, String imagePath, byte[] image) {
		super();
		this.hotelId = hotelId;
		this.imagePath = imagePath;
		this.image = image;
	}
	
	
	
	
}
