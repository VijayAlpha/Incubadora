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
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Service
public class NFTActivityServiceImpl implements NFTActivityService {

    @Autowired
    private NFTActivityRepository nftActivityRepository;

    @Autowired
    private CategoryService categoryService;


    @Override
    public TableResponse getNFTs(PaginationDTO pagination) {
        boolean isGrouping = pagination.getFilter().stream().filter(filter -> filter.getKey().equals("price")).findAny().isPresent();

        TableResponse response;

        Pageable paging = PageRequest.of(pagination.getPageNo()-1, isGrouping ? pagination.getPageSize() * 1000000 : pagination.getPageSize());
        Page<NFTActivities> nftActivitiesPage = nftActivityRepository.findAll(getSpecifications(pagination), paging);
        List<List<NFTActivityDTO>> groupedRecords = new ArrayList<>();

        if (nftActivitiesPage.hasContent()) {
            List<NFTActivityDTO> eCategoryList = nftActivitiesPage.getContent().stream().map(this::copyToDTO).collect(Collectors.toList());

            if(isGrouping) {
                Optional<SearchCriteria> priceCriteria = pagination.getFilter().stream().filter(filter -> filter.getKey().equals("price")).findAny();
                if(priceCriteria.isPresent()){
                    Map<Double, List<NFTActivityDTO>> groupedNFTs = eCategoryList.stream().collect(Collectors.groupingBy(NFTActivityDTO::getEPrice));
                    Map<Integer, Map<Integer, Integer>> categories = getPriceGrouping();

                    Double value = expoToNear(Double.valueOf(priceCriteria.get().getValue().toString()));
                    if(categories.containsKey(value.intValue())){
                        Map<Integer, Integer> priceGroup = categories.get(value.intValue());
                        Set<Integer> recordCount = groupedNFTs.entrySet().stream().filter(set -> priceGroup.containsKey(set.getKey().intValue())).map(set -> set.getValue().size()).collect(Collectors.toSet());
                        int minRecordCount = recordCount.stream().min(Integer::compareTo).get();

                        for(Double i= 0D; i<minRecordCount; i++){
                            List<NFTActivityDTO> groupRecord = new ArrayList<>();
                            Double finalI = i;
                            priceGroup.entrySet().forEach(groupedNft -> {
                                AtomicInteger ai = new AtomicInteger(0);
                                try {
                                    List<NFTActivityDTO> dtoas = groupedNFTs.get(groupedNft.getKey().doubleValue());
                                    int count = groupedNft.getValue();
                                    if (!ObjectUtils.isEmpty(dtoas)) {
                                        for(int j=0; j<count; j++) {
                                            groupRecord.add(dtoas.get(finalI.intValue() + j));
                                        }
                                    }
                                }catch (Exception e){
                                }
                            });
                            if(groupRecord.size() >= priceGroup.size()) {
                                groupedRecords.add(groupRecord);
                            }
                            Collections.shuffle(groupedRecords);
                        }
                    }
                }
                response = new TableResponse(pagination.getDraw(), (int) nftActivitiesPage.getTotalElements(), (int) nftActivitiesPage.getTotalElements(),
                        groupedRecords, "group");
            }
            else {
                response = new TableResponse(pagination.getDraw(), (int) nftActivitiesPage.getTotalElements(), (int) nftActivitiesPage.getTotalElements(),
                        eCategoryList, "normal");
            }
        } else {
            response = new TableResponse(pagination.getDraw(), (int) nftActivitiesPage.getTotalElements(), (int) nftActivitiesPage.getTotalElements(),
                    new ArrayList<>(), "normal");
        }
        return response;
    }

    private Map<Integer, Map<Integer, Integer>> getPriceGrouping() {
        Map<Integer, Map<Integer, Integer>> priceGroupings = new HashMap<>();

        Map<Integer, Integer> tenNear = new HashMap<>();
        tenNear.put(5, 1);
        tenNear.put(2, 2);
        tenNear.put(1, 1);


        Map<Integer, Integer> twentyNear = new HashMap<>();
        twentyNear.put(10, 1);
        twentyNear.put(5, 1);
        twentyNear.put(2, 2);
        twentyNear.put(1, 1);

        Map<Integer, Integer> fiftyNear = new HashMap<>();
        fiftyNear.put(20, 1);
        fiftyNear.put(10, 2);
        fiftyNear.put(5, 1);
        fiftyNear.put(2, 2);
        fiftyNear.put(1, 1);

        Map<Integer, Integer> hunderedNear = new HashMap<>();
        hunderedNear.put(30, 1);
        hunderedNear.put(20, 2);
        hunderedNear.put(10, 3);

        Map<Integer, Integer> twoHundredNear = new HashMap<>();
        twoHundredNear.put(50, 1);
        twoHundredNear.put(30, 3);
        twoHundredNear.put(20, 2);
        twoHundredNear.put(10, 1);


        priceGroupings.put(10, tenNear);
        priceGroupings.put(20, twentyNear);
        priceGroupings.put(50, fiftyNear);
        priceGroupings.put(100, hunderedNear);
        priceGroupings.put(200, twoHundredNear);

        return priceGroupings;
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
        Double diff = 1000000000000000000000000D;
        NFTActivityDTO nftActivityDTO = Mapper.map(nftActivities, NFTActivityDTO.class);
        DecimalFormat df = new DecimalFormat("0", DecimalFormatSymbols.getInstance(Locale.ENGLISH));
        df.setMaximumFractionDigits(340);
        nftActivityDTO.setEPrice(expoToNear(nftActivityDTO.getPrice()));
        return nftActivityDTO;
    }

    private Double expoToNear(Double expo){
        Double diff = 1000000000000000000000000D;
        DecimalFormat df = new DecimalFormat("0", DecimalFormatSymbols.getInstance(Locale.ENGLISH));
        df.setMaximumFractionDigits(340);
        return Math.floor(Double.valueOf(df.format(expo / diff)));
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
