package com.art.horizon.controller;

import com.art.horizon.dto.Obj;
import com.art.horizon.dto.pagination.PaginationDTO;
import com.art.horizon.dto.pagination.TableResponse;
import com.art.horizon.service.NFTActivityService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/nft/activity")
public class NFTAcitivityController {

    @Autowired
    private NFTActivityService nftActivityService;


    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity<TableResponse> getNFTs(@RequestBody PaginationDTO pagination){
        TableResponse tableResponse = nftActivityService.getNFTs(pagination);
        return new ResponseEntity<>(tableResponse, HttpStatus.ACCEPTED);
    }


    @RequestMapping(value = "fetch", method = RequestMethod.GET)
    public void fetch(){

        String request = "{\n    \"query\": \"query MyQuery {\\n  mb_views_active_listings(limit: 1000, order_by: {created_at: desc}) {\\n    metadata_id\\n    price\\n    created_at\\n    description\\n    media\\n    title\\n  }\\n}\\n\",\n    \"variables\": {}\n}";

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response =  restTemplate.postForEntity("https://interop-mainnet.hasura.app/v1/graphql", request, String.class);
        if(response.hasBody()){
            String data = response.getBody();
            Obj data1 = new Gson().fromJson(data, Obj.class);
            nftActivityService.saveAll(data1.getData().getMb_views_active_listings());
        }
    }

    @RequestMapping(value = "updateActivity", method = RequestMethod.GET)
    public ResponseEntity<?> updateActivity(@RequestParam("id") String id, @RequestParam("category") String category){
        nftActivityService.updateActivity(id, category);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
