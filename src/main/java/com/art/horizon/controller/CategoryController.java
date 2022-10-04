package com.art.horizon.controller;

import com.art.horizon.config.CustomException;
import com.art.horizon.domain.Category;
import com.art.horizon.dto.pagination.PaginationDTO;
import com.art.horizon.dto.pagination.TableResponse;
import com.art.horizon.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ResponseEntity<?> saveCategory(@RequestBody Category category) throws CustomException, ParseException {
        categoryService.saveCategory(category);
        return new ResponseEntity<Category>(HttpStatus.CREATED);
    }


    @RequestMapping(value = "/categories", method = RequestMethod.GET)
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categoryList = categoryService.getAllCategories();
        return new ResponseEntity<>(categoryList, HttpStatus.OK);
    }

    @RequestMapping(value = "/by-id", method = RequestMethod.GET)
    public ResponseEntity<Category> findById(@RequestParam("id") String id) {
        Category category = categoryService.findById(id);
        return new ResponseEntity<>(category, HttpStatus.OK);
    }

    @RequestMapping(value = "/by-ids", method = RequestMethod.GET)
    public ResponseEntity<List<Category>> findAllById(@RequestParam("ids") List<String> ids) {
        List<Category> categoryList = categoryService.findAllById(ids);
        return new ResponseEntity<>(categoryList, HttpStatus.OK);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    public ResponseEntity<Category> delete(@RequestParam("id") String id) throws CustomException {
        categoryService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity<TableResponse> getCategories(@RequestBody PaginationDTO pagination){
        TableResponse tableResponse = categoryService.getCategories(pagination);
        return new ResponseEntity<>(tableResponse, HttpStatus.ACCEPTED);
    }

}
