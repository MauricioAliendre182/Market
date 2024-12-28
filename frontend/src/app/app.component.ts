import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service'
import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  imgParent = 'https://images6.alphacoders.com/124/thumb-1920-1249545.jpg';
  showImg = true
  token = '';
  imgRta = '';

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private userService: UsersService,
    private fileService: FilesService
  ){

  }
  ngOnInit(): void {
    // We the app initializes
    // We want to see if we have an authenticated user
    const token = this.tokenService.getToken();

    // If there is a token, execute the .getProfile method in authService
    if (token) {
      this.authService.getProfile()
      // We need to do a subscribe() to execute this method
      .subscribe()
    }
  }

  onLoaded(img: string) {
    console.log("parent log", img)
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  createUser() {
    this.userService.createAdmin({
      name: "Gonzalo Aliendre",
      username: "gonza1",
      password: "gonza1"
    })
    .subscribe(rta => {
      console.log(rta)
    })
  }

  login() {
    this.authService.login({
      username: "gonza12",
      password: "gonza12"
    })
    .subscribe(rta => {
      console.log(rta.body!.token)
      this.token = rta.body!.token
    })
  }

  getProfile() {
    this.authService.getProfile()
  }

  downloadPDF() {
    this.fileService.getFile("myPdf", "https://young-sands-07814.herokuapp.com/api/files/dummy.pdf", "application/pdf")
    .subscribe()
  }

  onUpload(event: Event) {
    const element = event.target as HTMLInputElement
    // Ask if the element has attached elements, we select only one file
    const file = element.files?.item(0)
    if (file) {
      this.fileService.uploadFile(file)
      .subscribe(rta => {
        this.imgRta = rta.location;
      })
    }
  }
}
