package com.shop.service;
import java.util.List;
import com.shop.dao.ProductDao;
import com.shop.dto.ProductDTO;
import com.shop.poojo.Product;
public interface ProductService {
	Product save(ProductDTO dto);

    List<Product> getAll();

    Product getById(Long id);

    Product update(Long id, ProductDTO dto);

    void delete(Long id);

    List<Product> findByCategoryId(Long categoryId); 
}
