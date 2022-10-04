package com.art.horizon.service;

import com.art.horizon.config.CustomException;
import com.art.horizon.domain.Category;
import com.art.horizon.dto.pagination.PaginationDTO;
import com.art.horizon.dto.pagination.TableResponse;

import java.util.List;

public interface CategoryService {

    List<Category> getAllCategories();

    Category findById(String id);

    List<Category> findAllById(List<String> ids);

    void delete(String id);

    TableResponse getCategories(PaginationDTO pagination);

    Category saveCategory(Category category) throws CustomException;

}
