package com.art.horizon.repository.specification;

import com.art.horizon.domain.Category;
import com.art.horizon.domain.NFTActivities;
import com.art.horizon.dto.pagination.SearchCriteria;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class NFTActivitySpecification extends BaseSpecification implements Specification<NFTActivities> {
    private SearchCriteria criteria;

    public NFTActivitySpecification(SearchCriteria criteria) {
        this.criteria = criteria;
    }


    @Override
    public Predicate toPredicate(Root<NFTActivities> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
        if (criteria.getKey().contains(".")) {
            String join = criteria.getKey().split("\\.")[0];
            if (join.equalsIgnoreCase("category")) {
                Join<NFTActivities, Category> unitJoin = root.join("category");
                criteria.setKey(criteria.getKey().split("\\.")[1]);
                return getPredicate(criteria, unitJoin, query, builder);
            }
        }

        return getPredicate(criteria, root, query, builder);
    }
}
