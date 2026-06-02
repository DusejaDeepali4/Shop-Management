package com.shop.dao;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shop.poojo.Category;
public interface CategoryDao extends JpaRepository<Category,Long>{
	Optional<Category> findByName(String name);
}
