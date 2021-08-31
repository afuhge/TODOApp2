import {Component} from '@angular/core';
import {IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {faGithub, faLinkedin} from '@fortawesome/free-brands-svg-icons';
import {ApiUrlHelperService} from '../../services/api-url-helper.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  public linkedIn: IconDefinition = faLinkedin;
  public gitHub: IconDefinition = faGithub;
  public linkedInUrl: string = 'https://www.linkedin.com/in/annika-fuhge-952447208/';
  public gitHubUrl: string = 'https://github.com/afuhge';
  public privacy: string = ApiUrlHelperService.getPrivacy();
  public imprint: string = ApiUrlHelperService.getImprint();

}
