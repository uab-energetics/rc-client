import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {RedirectService} from "../../../core/auth/redirect.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-oauth',
  templateUrl: './oauth.component.html',
  styleUrls: ['./oauth.component.css']
})
export class OauthComponent implements OnInit {

  static TOKEN_QUERY_PARAM = 'jwt'

  constructor(private as: AuthService,
              private router: Router,
              private rdir: RedirectService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe( params => {
      let jwt = params[OauthComponent.TOKEN_QUERY_PARAM]
      this.as.oauthLogin({ jwt })
      this.rdir.followRedirect()
    })
  }

}
