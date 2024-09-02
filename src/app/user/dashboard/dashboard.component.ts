import { Component, OnInit } from '@angular/core';
import { ReservationServiceService } from '../../services/reservation-service.service';
import { FormControl, FormGroup } from '@angular/forms';
import { reservationModel } from '../../model/reservation-model';
import { LoginService } from '../../services/login.service';

declare var bootstrap: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  formReservation: FormGroup = new FormGroup({});
  businesses: any[] = [];
  reservations: reservationModel[] = [];
  currentReservation: reservationModel | null = null;

  constructor(
    private reservationService: ReservationServiceService,
    private loginService: LoginService) { }

  ngOnInit() {
    this.formReservation = new FormGroup({
      reservationId: new FormControl(''),
      creationDate: new FormControl(''),
      modificationDate: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      startTime: new FormControl(''),
      details: new FormControl(''),
      status: new FormControl(''),
      businessId: new FormControl('')
    });

    this.loadBusinesses();
    this.loadReservations();
  }

  loadBusinesses() {
    this.reservationService.getBusinesses().subscribe(data => {
      this.businesses = data;
    });
  }

  loadReservations() {
    const userId = this.loginService.getUserId();
    if (userId != null) {
      this.reservationService.getReservations(userId).subscribe(data => {
        this.reservations = data.map(reservation => {
          const startTime = reservation.startTime ? new Date(`1970-01-01T${reservation.startTime}`) : null;
          return new reservationModel({
            ...reservation,
            startTime
          });
        });
      });
    } else {
      console.log("Error in the token");
    }
  }

  save() {
    const formValue = this.formReservation.value;

    const creationDateStr = formValue.creationDate;
    const modificationDateStr = formValue.modificationDate || creationDateStr;
    const startDateStr = formValue.startDate;
    const endDateStr = formValue.endDate;
    const startTimeStr = formValue.startTime;
    const businessId = parseInt(formValue.businessId);
    const userId = this.loginService.getUserId();

    if (!creationDateStr || !startDateStr || !endDateStr || !startTimeStr || !businessId) {
      console.error('Incomplete form data');
      return;
    }

    try {
      const creationDate = new Date(`${creationDateStr}T${startTimeStr}:00`);
      const modificationDate = new Date(`${modificationDateStr}T${startTimeStr}:00`);
      const formattedCreationDate = creationDate.toISOString().split('.')[0];
      const formattedModificationDate = modificationDate.toISOString().split('.')[0];
      const formattedStartDate = startDateStr;
      const formattedEndDate = endDateStr;
      const formattedStartTime = startTimeStr + ':00';

      const formattedData = {
        ...formValue,
        creationDate: formattedCreationDate,
        modificationDate: formattedModificationDate,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        startTime: formattedStartTime,
        business: { businessId },
        user: { userId }
      };

      this.reservationService.saveRservations(formattedData).subscribe(res => {
        if (res) {
          console.log('Reservation saved');
          console.log(formattedData);
          this.loadReservations();
        }
      });

    } catch (error) {
      console.error('Error processing dates and times:', error);
    }
  }

  update() {
    if (this.currentReservation) {
      const formValue = this.formReservation.value;

      const creationDateStr = formValue.creationDate;
      const modificationDateStr = formValue.modificationDate || creationDateStr;
      const startDateStr = formValue.startDate;
      const endDateStr = formValue.endDate;
      const startTimeStr = formValue.startTime;
      const businessId = formValue.businessId;

      if (!creationDateStr || !startDateStr || !endDateStr || !startTimeStr || !businessId) {
        console.error('Incomplete form data');
        return;
      }

      try {
        const creationDate = new Date(`${creationDateStr}T${startTimeStr}:00`);
        const modificationDate = new Date(`${modificationDateStr}T${startTimeStr}:00`);
        const formattedCreationDate = creationDate.toISOString().split('.')[0];
        const formattedModificationDate = modificationDate.toISOString().split('.')[0];
        const formattedStartDate = startDateStr;
        const formattedEndDate = endDateStr;
        const formattedStartTime = startTimeStr + ':00';

        const formattedData = {
          ...formValue,
          creationDate: formattedCreationDate,
          modificationDate: formattedModificationDate,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
          startTime: formattedStartTime,
          business: { businessId }
        };

        this.reservationService.updateReservations(formattedData).subscribe(res => {
          if (res) {
            console.log('Reservation updated');
            console.log(formattedData);
            this.loadReservations();
          }
        });

      } catch (error) {
        console.error('Error processing dates and times:', error);
      }
    }
  }

  editReservation(reservation: reservationModel) {
    this.currentReservation = reservation;
    this.formReservation.patchValue({
      ...reservation,
      businessId: reservation.business?.businessId
    });
    const modal = new bootstrap.Modal(document.getElementById('exampleModal') as Element);
    modal.show();
  }

  isDeleting: boolean = false;

  deleteReservation(id: number) {
    if (confirm('Are you sure you want to delete this reservation?')) {
      this.isDeleting = true;

      const data = {
        reservationId: id
      };

      this.reservationService.cancelarReservations(data).subscribe(res => {
        if (res) {
          this.reservations = this.reservations.filter(reservation => reservation.reservationId !== id);
          console.log('Reservation deleted');
        }
        this.isDeleting = false;
      }, error => {
        console.error('Error deleting reservation:', error);
        this.isDeleting = false;
      });
    }
  }
}
