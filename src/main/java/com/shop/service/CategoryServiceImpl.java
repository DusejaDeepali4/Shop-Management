package com.shop.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.shop.dao.CategoryDao;
import com.shop.dto.CategoryDTO;
import com.shop.exception.ResourceNotFoundException;
import com.shop.poojo.Category;


@Service
@Transactional
public class CategoryServiceImpl implements CategoryService{

	private final CategoryDao catdao;
	
	public CategoryServiceImpl(CategoryDao catdao) {
		this.catdao=catdao;
	}
	@Override
	public Category save(CategoryDTO dto) {
		 Category category = new Category();

	        category.setName(dto.getName());

	        return catdao.save(category);
	}

	@Override
	public List<Category> getAll() {
		return catdao.findAll();
	}

	@Override
	public Category getById(Long id) {
		return catdao.findById(id).orElseThrow(()->new ResourceNotFoundException("Category Not Found"));
	}

	@Override
	public Category update(Long id, CategoryDTO dto) {

        Category category = getById(id);

        category.setName(dto.getName());

        return catdao.save(category);
	}

	@Override
	public void delete(Long id) {
		Category category = getById(id);

        catdao.delete(category);
		
	}

}
