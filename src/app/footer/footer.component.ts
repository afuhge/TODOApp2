import { Component, OnInit } from '@angular/core';
import {IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {faGithub, faLinkedin} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent  {

  public linkedIn: IconDefinition = faLinkedin;
  public gitHub: IconDefinition = faGithub;

}
