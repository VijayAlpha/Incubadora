package com.art.horizon.dto;

import lombok.Data;

@Data
public class NFTActivityDTO {
    private String id;
    private String title;
    private String media;
    private String metadata_id;
    private Double price;
    private Double ePrice;
    private CategoryDTO category;
    private Integer priority;
}
