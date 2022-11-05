import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { NftService } from '../../../../service/nft.service';
import { DepartmentService } from '../department.service';
import { Wallet, Chain, Network } from "mintbase";
import { NbToastRef } from '@nebular/theme';
import { CommonToastrService } from '../../../../common-shared/common-toastr/common-toastr.service';

@Component({
  selector: 'ngx-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent implements OnInit {
  postPerPage: number = 10;
  pageNumber: number = 1;
  data: any = [];
  data2: any;
  filters: any[] = [];
  count: any = 0;
  categories: any[] = [];
  @Input() private datatrigger: EventEmitter<any>;
  type: any;


  walletX: any;
  isConnectedX: any = false;
  walletDataX: any;


  constructor(private nftService: NftService,  private commonToastrService: CommonToastrService) {
    this.connect2();
  }


  async connect2() {
    const { data: walletData, error } = await new Wallet().init({
      networkName: Network.mainnet,
      chain: Chain.near,
      apiKey: "511a3b51-2ed5-4a27-b165-a27a01eebe0a",
    })

    const { wallet, isConnected } = walletData

    this.walletX = wallet;
    this.isConnectedX = isConnected;

    if (isConnected) {
      this.isConnectedX = isConnected;
      const { data: details } = await wallet.details()
      this.walletDataX = this.data;
    }

  }


  ngOnInit(): void {
    this.loadData();
    this.getCategories();
    if (this.datatrigger) {
      this.datatrigger.subscribe((filter) => {
        this.filters = filter;
        this.loadData();
      });
    }

  }
  loadData = () => {
    this.nftService.getNft(this.postPerPage, this.pageNumber, this.filters).subscribe((nfts: any) => {
      console.log(nfts);
      this.data = nfts.data;
      this.data2 = this.data[0];
      this.count = this.data.length;
      this.type = nfts?.type;
    })

  };

  getCategories = () => {
    this.nftService.getCategories().subscribe((categories: any) => {
      this.categories = categories;
    });
  };


  updateCategory = (activityId, categoryId: string) => {
    this.nftService.updateCategory(activityId, categoryId.trim()).subscribe((nft: any) => {
      this.loadData();
    });
  };


  onPaginate = (pageEvent: PageEvent) => {
    this.postPerPage = +pageEvent.pageSize;
    this.pageNumber = +pageEvent.pageIndex + 1;
    console.log(this.pageNumber + " " + this.postPerPage);
    this.loadData();
  }


  onPaginateGroup = (pageEvent: PageEvent) => {
    this.postPerPage = +pageEvent.pageSize;
    this.pageNumber = +pageEvent.pageIndex + 1;
    console.log(this.pageNumber + " " + this.postPerPage);

    if (this.data.length >= pageEvent.pageIndex) {
      this.data2 = this.data[pageEvent.pageIndex];
    }

  };



  mint = async nfts => {
    //console.log(nfts);
    let tokenIds = [];
    let prices = [];

    nfts.forEach(nft => {
      tokenIds.push(nft.token_id + ":" + nft.nft_contract_id);
      prices.push(this.exponentialToDecimal(nft.price));
    });

    if (this.isConnectedX) {
      const marketAddress = "market.mintspace2.near";

      console.log(tokenIds);
      console.log(prices);
      console.log(marketAddress);

      await this.walletX.batchMakeOffer(tokenIds, prices, {
        marketAddress,
      });

    } else {
       this.commonToastrService.showFailure("Please Connect Wallet to Mint");
    }

  };



  exponentialToDecimal = exponential => {
    let decimal = exponential.toString().toLowerCase();
    if (decimal.includes('e+')) {
      const exponentialSplitted = decimal.split('e+');
      let postfix = '';
      for (
        let i = 0; i <
        +exponentialSplitted[1] -
        (exponentialSplitted[0].includes('.') ? exponentialSplitted[0].split('.')[1].length : 0); i++
      ) {
        postfix += '0';
      }
      const addCommas = text => {
        let j = 3;
        let textLength = text.length;
        while (j < textLength) {
          text = `${text.slice(0, textLength - j)},${text.slice(textLength - j, textLength)}`;
          textLength++;
          j += 3 + 1;
        }
        return text;
      };
      decimal = exponentialSplitted[0].replace('.', '') + postfix;
    }
    if (decimal.toLowerCase().includes('e-')) {
      const exponentialSplitted = decimal.split('e-');
      let prefix = '0.';
      for (let i = 0; i < +exponentialSplitted[1] - 1; i++) {
        prefix += '0';
      }
      decimal = prefix + exponentialSplitted[0].replace('.', '');
    }
    return decimal;
  };

}
