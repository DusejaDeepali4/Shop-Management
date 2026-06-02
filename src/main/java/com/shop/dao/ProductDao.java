package com.shop.dao;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.shop.poojo.Product;
public interface ProductDao extends JpaRepository<Product,Long>{
List<Product> findByCategoryId(Long categoryId);
}
