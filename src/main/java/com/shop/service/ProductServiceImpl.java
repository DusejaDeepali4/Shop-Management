package com.shop.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.shop.dao.CategoryDao;
import com.shop.dao.ProductDao;
import com.shop.dto.ProductDTO;
import com.shop.exception.ResourceNotFoundException;
import com.shop.poojo.Category;
import com.shop.poojo.Product;
@Service
@Transactional
public class ProductServiceImpl implements ProductService{

	private final ProductDao pdao;
	private final CategoryDao cdao;
	
	public ProductServiceImpl(ProductDao pdao,CategoryDao cdao) {
		this.pdao=pdao;
		this.cdao=cdao;
	}
	@Override
	public Product save(ProductDTO dto) {
		Category category =
                cdao.findById(dto.getCategoryId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Category not found"));

        Product product = new Product();

        product.setProductName(dto.getProductName());
        product.setBrand(dto.getBrand());
        product.setSize(dto.getSize());
        product.setUnit(dto.getUnit());
        product.setPrice(dto.getPrice());
        product.setStock(dto.getStock());
        product.setCategory(category);

        return pdao.save(product);
	}

	@Override
	public List<Product> getAll() {
		return pdao.findAll();
	}

	@Override
	public Product getById(Long id) {
		return pdao.findById(id)
                .orElseThrow(() ->
                new ResourceNotFoundException(
                        "Product not found"));
	}

	@Override
	public Product update(Long id, ProductDTO dto) {
		Product product = getById(id);

        Category category =
                cdao.findById(dto.getCategoryId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Category not found"));

        product.setProductName(dto.getProductName());
        product.setBrand(dto.getBrand());
        product.setSize(dto.getSize());
        product.setUnit(dto.getUnit());
        product.setPrice(dto.getPrice());
        product.setStock(dto.getStock());
        product.setCategory(category);

        return pdao.save(product);
	}

	@Override
	public void delete(Long id) {
		Product product = getById(id);

        pdao.delete(product);
		
	}

	@Override
	public List<Product> findByCategoryId(Long categoryId) {
		return pdao.findByCategoryId(categoryId);
	}

}
