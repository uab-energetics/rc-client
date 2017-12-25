import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {InvitationsService} from "../../shared/services/invitations.service";
import {SweetAlertService} from "ng2-sweetalert2";
import {UserService} from "../../shared/auth/user.service";
import {AuthService} from "../../shared/auth/auth.service";


@Component({
  selector: 'app-redeem-invite',
  templateUrl: './redeem-invite.component.html',
  styleUrls: ['./redeem-invite.component.css']
})
export class RedeemInviteComponent implements OnInit {

  invitation: any;

  queryParams: Params;

  loading = 0;
  tokenIsValid = true;
  isAuthenticated = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private invites: InvitationsService,
    private userService: UserService,
    private authService: AuthService,
    private sweetAlerts: SweetAlertService
  ) { }

  validateInvite(token) {
    this.loading++;
    this.invites.validateInvitation(token)
      .finally(() => this.loading--)
      .catch(err => {
        this.tokenIsValid = false;
        return [];
      })
      .subscribe(res => {

        if(!this.userService.isAuthenticated()){
          this.isAuthenticated = false;
          this.authService.setRedirectURL(window.location.pathname, this.queryParams);
        }

        this.invitation = res;
      });
  }


  /**
   *  ===========================================
   *  UI EVENT HANDLERS
   *  ===========================================
   */

  acceptInvite(){
    this.invites.acceptInvite(this.queryParams.token)
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
          this.validateInvite(this.queryParams.token);
          this.loading--;
        }, 2000); // so you can see the animation
      });

    console.log(this.queryParams);
  }

  ngOnDestroy(): void {
    document.body.classList.remove('page-forgot-password', 'layout-full');
  }

}
