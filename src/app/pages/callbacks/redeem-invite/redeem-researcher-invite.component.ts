import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {InvitationsService} from "../../../core/invitations/invitations.service";
import {SweetAlertService} from "ng2-sweetalert2";
import {RedirectService} from '../../../core/auth/redirect.service'
import {JwtService} from '../../../core/auth/jwt.service'


@Component({
  selector: 'app-redeem-researcher-invite',
  templateUrl: './redeem-researcher-invite.component.html',
  styleUrls: ['./redeem-researcher-invite.component.css']
})
export class RedeemResearcherInviteComponent implements OnInit {

  invitation: any;

  queryParams: Params;

  loading = 0;
  tokenIsValid = true;
  isAuthenticated = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private invites: InvitationsService,
    private userService: JwtService,
    private redirectService: RedirectService,
    private sweetAlerts: SweetAlertService
  ) { }

  validateResearcherInvite(token) {
    this.loading++;
    this.invites.validateResearcherInvitation(token)
      .finally(() => this.loading--)
      .catch(err => {
        this.tokenIsValid = false;
        return [];
      })
      .subscribe(res => {

        if(!this.userService.isAuthenticated()){
          this.isAuthenticated = false;
          this.redirectService.setRedirect(window.location.pathname, this.queryParams);
        }

        this.invitation = res;
      });
  }


  /**
   *  ===========================================
   *  UI EVENT HANDLERS
   *  ===========================================
   */

  acceptResearcherInvite(){
    this.invites.acceptResearcherInvite(this.queryParams.token)
      .subscribe(() => {
        this.sweetAlerts.swal({
          title: "Success!",
          text: "You have joined the project.",
          confirmButtonText: "Take me there!",
          onClose: () => this.router.navigate(['/projects'])
        })
      })
  }

  ngOnInit(): void {
    document.body.classList.add('page-forgot-password', 'layout-full');

    this.route.queryParams
      .subscribe(loadedParams => {
        this.queryParams = loadedParams;

        if (!this.queryParams.token) {
          this.tokenIsValid = false;
          return;
        }

        this.loading = 1;
        setTimeout(() => {
          this.validateResearcherInvite(this.queryParams.token);
          this.loading--;
        }, 2000); // so you can see the animation
      });

    console.log(this.queryParams);
  }

  ngOnDestroy(): void {
    document.body.classList.remove('page-forgot-password', 'layout-full');
  }

}
