package com.art.horizon.service.impl;

import com.art.horizon.domain.Category;
import com.art.horizon.domain.NFTActivities;
import com.art.horizon.dto.NFTActivityDTO;
import com.art.horizon.dto.pagination.PaginationDTO;
import com.art.horizon.dto.pagination.SearchCriteria;
import com.art.horizon.dto.pagination.TableResponse;
import com.art.horizon.repository.NFTActivityRepository;
import com.art.horizon.repository.specification.NFTActivitySpecification;
import com.art.horizon.service.CategoryService;
import com.art.horizon.service.NFTActivityService;
import com.art.horizon.util.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class NFTActivityServiceImpl implements NFTActivityService {

    @Autowired
    private NFTActivityRepository nftActivityRepository;

    @Autowired
    private CategoryService categoryService;


    @Override
    public TableResponse getNFTs(PaginationDTO pagination) {
        TableResponse response;
        Pageable paging = PageRequest.of(pagination.getPageNo()-1, pagination.getPageSize(), Sort.by("title").ascending());
        Page<NFTActivities> nftActivitiesPage = nftActivityRepository.findAll(getSpecifications(pagination), paging);
        if (nftActivitiesPage.hasContent()) {
            List<NFTActivityDTO> eCategoryList = nftActivitiesPage.getContent().stream().map(this::copyToDTO).collect(Collectors.toList());
            response = new TableResponse(pagination.getDraw(), (int) nftActivitiesPage.getTotalElements(), (int) nftActivitiesPage.getTotalElements(),
                    eCategoryList);
        } else {
            response = new TableResponse(pagination.getDraw(), (int) nftActivitiesPage.getTotalElements(), (int) nftActivitiesPage.getTotalElements(),
                    new ArrayList<>());
        }
        return response;
    }

    @Override
    public List<NFTActivities> saveAll(List<NFTActivityDTO> activities) {
        List<NFTActivities> activitiesList = activities.stream().map(activity -> Mapper.map(activity, NFTActivities.class)).collect(Collectors.toList());
        nftActivityRepository.saveAll(activitiesList);
        return activitiesList;
    }

    @Override
    public void updateActivity(String id, String categoryId) {
        Optional<NFTActivities> nftActivitiesOptional = nftActivityRepository.findById(id);
        if(nftActivitiesOptional.isPresent()){
            Category category = categoryService.findById(categoryId);
            NFTActivities nftActivities = nftActivitiesOptional.get();
            nftActivities.setCategory(category);
            nftActivityRepository.save(nftActivities);
        }
    }

    private NFTActivityDTO copyToDTO(NFTActivities nftActivities){
        NFTActivityDTO nftActivityDTO = Mapper.map(nftActivities, NFTActivityDTO.class);
        DecimalFormat df = new DecimalFormat("0", DecimalFormatSymbols.getInstance(Locale.ENGLISH));
        df.setMaximumFractionDigits(340);
        nftActivityDTO.setEPrice(df.format(nftActivities.getPrice()));
        return nftActivityDTO;
    }

    private Specification<NFTActivities> getSpecifications(PaginationDTO pagination) {
        List<SearchCriteria> params = new ArrayList<>(pagination.getFilter());

        if (params.size() == 0) {
            return null;
        }

        List<Specification<NFTActivities>> specs = params.stream()
                .map(NFTActivitySpecification::new)
                .collect(Collectors.toList());

        Specification<NFTActivities> result = specs.get(0);

        for (int i = 1; i < params.size(); i++) {
            result = params.get(i)
                    .isOrPredicate()
                    ? Specification.where(result)
                    .or(specs.get(i))
                    : Specification.where(result)
                    .and(specs.get(i));
        }

        return result;
    }

}
