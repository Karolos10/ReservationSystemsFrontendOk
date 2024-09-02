
import { Component, numberAttribute, OnInit } from '@angular/core';
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
      businessId: new FormControl('') // Agregar control para el ID del negocio
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
        this.reservations = data;
      });
    } else {
      console.log("Error en el token");
    }
  }

  save() {
    const formValue = this.formReservation.value;

    // Validar que todos los campos necesarios están presentes
    const creationDateStr = formValue.creationDate;
    const modificationDateStr = formValue.modificationDate || creationDateStr;
    const startDateStr = formValue.startDate;
    const endDateStr = formValue.endDate;
    const startTimeStr = formValue.startTime;
    const businessId = parseInt(formValue.businessId);
    const userId = this.loginService.getUserId();

    if (!creationDateStr || !startDateStr || !endDateStr || !startTimeStr || !businessId) {
      console.error('Datos del formulario incompletos');
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
          this.loadReservations(); // Recargar reservas
        }
      });

    } catch (error) {
      console.error('Error al procesar las fechas y horas:', error);
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
        console.error('Datos del formulario incompletos');
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
            this.loadReservations(); // Recargar reservas
          }
        });

      } catch (error) {
        console.error('Error al procesar las fechas y horas:', error);
      }
    }
  }

  editReservation(reservation: reservationModel) {
    this.currentReservation = reservation;
    this.formReservation.patchValue({
      ...reservation,
      businessId: reservation.business?.businessId
    });
    // Mostrar el modal para edición
    const modal = new bootstrap.Modal(document.getElementById('exampleModal') as Element);
    modal.show();
  }

  deleteReservation(id: number) {
    if (confirm('Are you sure you want to delete this reservation?')) {
      const data = {
        reservationId: id
      }
      this.reservationService.cancelarReservations(data).subscribe(res => {
        if (res) {
          console.log('Reservation deleted');
          this.loadReservations(); // Recargar reservas
        }
      });
    }
  }
}
