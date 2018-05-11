import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {InvitationsService} from "../../../shared/services/invitations.service";
import {SweetAlertService} from "ng2-sweetalert2";
import {RedirectService} from '../../../core/auth/redirect.service'
import {JwtService} from '../../../core/auth/jwt.service'


@Component({
  selector: 'app-redeem-encoder-invite',
  templateUrl: './redeem-encoder-invite.component.html',
  styleUrls: ['./redeem-encoder-invite.component.css']
})
export class RedeemEncoderInviteComponent implements OnInit {

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

  validateEncoderInvite(token) {
    this.loading++;
    this.invites.validateEncoderInvitation(token)
      .finally(() => this.loading--)
      .catch(err => {
        this.tokenIsValid = false;
        return [];
      })
      .subscribe(res => {

        if(!this.userService.isAuthenticated()){
          this.isAuthenticated = false;
          this.redirectService.setRedirect(window.location.pathname, this.queryParams)
        }

        this.invitation = res;
      });
  }


  /**
   *  ===========================================
   *  UI EVENT HANDLERS
   *  ===========================================
   */

  acceptEncoderInvite(){
    this.invites.acceptEncoderInvite(this.queryParams.token)
      .subscribe(() => {
        this.sweetAlerts.swal({
          title: "Success!",
          text: "You have joined the project.",
          confirmButtonText: "Take me there!",
          onClose: () => this.router.navigate(['/tasks'])
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
          this.validateEncoderInvite(this.queryParams.token);
          this.loading--;
        }, 2000); // so you can see the animation
      });

    console.log(this.queryParams);
  }

  ngOnDestroy(): void {
    document.body.classList.remove('page-forgot-password', 'layout-full');
  }

}
