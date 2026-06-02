package com.shop.service;
import java.util.List;
import com.shop.dto.CategoryDTO;
import com.shop.poojo.Category;
public interface CategoryService {
Category save(CategoryDTO dto);
List<Category> getAll();
Category getById(Long id);
Category update(Long id, CategoryDTO dto);
void delete(Long id);
}
