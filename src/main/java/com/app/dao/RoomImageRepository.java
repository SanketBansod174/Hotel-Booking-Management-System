package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.RoomImage;

public interface RoomImageRepository extends JpaRepository<RoomImage, Integer> {

	List<RoomImage> findByhotelId(Integer hotelId);

}
