import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TalentServiceService } from '../../services/talent.service';
import { PersonaInfo } from '../../interfaces/persona-info';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent implements OnInit {
  public readOnly: boolean = true;

  information: PersonaInfo;

  profileForm = this.fb.group({
    description : ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private service: TalentServiceService) {}

  ngOnInit(): void {
    this.getInfo();
  }

  disabled() {
    return (this.readOnly = false);
  }

  getInfo() {
    return this.service
      .getInfo(localStorage.getItem('token'))
      .subscribe((response) => {
        this.information = response['data'];
        this.profileForm.patchValue({
          description: this.information['persona_info'].description,
        });
      });
  }

  updateInfo(){
    return this.service.updateInfo(localStorage.getItem('token'),JSON.stringify(this.profileForm.value))
  }

}
