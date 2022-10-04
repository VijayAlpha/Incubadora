package com.art.horizon.service;

import com.art.horizon.domain.NFTActivities;
import com.art.horizon.dto.NFTActivityDTO;
import com.art.horizon.dto.pagination.PaginationDTO;
import com.art.horizon.dto.pagination.TableResponse;

import java.util.List;

public interface NFTActivityService {
    TableResponse getNFTs(PaginationDTO pagination);

    List<NFTActivities> saveAll(List<NFTActivityDTO> activities);

    void updateActivity(String id, String category);
}
