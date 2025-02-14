import { CommunitiesService } from 'projects/commudle-admin/src/app/services/communities.service';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ICommunity } from 'projects/shared-models/community.model';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NbWindowService } from '@nebular/theme';
import { EmailerComponent } from 'projects/commudle-admin/src/app/app-shared-components/emailer/emailer.component';
import { EemailTypes } from 'projects/shared-models/enums/email_types.enum';

@Component({
  selector: 'app-community-control-panel',
  templateUrl: './community-control-panel.component.html',
  styleUrls: ['./community-control-panel.component.scss']
})
export class CommunityControlPanelComponent implements OnInit {
  community: ICommunity;

  tabs: any[] = [
    {
      title: 'Events',
      route: `./`
    },
    {
      title: 'Members',
      route: `./members`
    },
    {
      title: 'Forms',
      route: `./forms`
    },
    {
      title: 'Team',
      route: `./team`
    },
    {
      title: 'Edit Details',
      route: `./edit`
    }


  ];

  constructor(
    private titleService: Title,
    private communitiesService: CommunitiesService,
    private activatedRoute: ActivatedRoute,
    private windowService: NbWindowService
  ) { }

  ngOnInit() {
    this.setCommunity();
  }


  setCommunity() {
    this.activatedRoute.params.subscribe(params => {
      let communityId = this.activatedRoute.snapshot.params['community_id'];
      this.communitiesService.getCommunityDetails(communityId).subscribe(
        data => {
          this.community = data;
          this.setTitle();
        }
      );
    });
  }

  setTitle() {
    this.titleService.setTitle(`Admin Dashboard | ${this.community.name}`);
  }

  sendEmails() {
    this.windowService.open(
      EmailerComponent,
      {
        title: `Send Email to All ${this.community.member_count} Members`,
        context: {
          community: this.community,
          mailType: EemailTypes.GENERAL_ALL,
        }
      }
    );
  }

}
