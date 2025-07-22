import { Component, ChangeDetectorRef, Output, EventEmitter, inject } from '@angular/core';
import { StudentsTable } from "../students-table/students-table";
import { Student } from '../../shared/entities';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AddForm } from '../add-form/add-form';
import { DeleteForm } from '../delete-form/delete-form';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EditForm } from '../edit-form/edit-form';

@Component({
  selector: 'app-navbar',
  imports: [StudentsTable, CommonModule, AddForm, DeleteForm, MatSnackBarModule, EditForm],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  @Output() sectionChanged = new EventEmitter<string>();

  students: Student[] = [];
  activeSection = "students";
  private _snackBar = inject(MatSnackBar);

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.http.get<Student[]>('mocks/students.json').subscribe(data => {
      this.students = data;
      this.cdr.detectChanges();
    });
  }

  navigate(section: string) {
    this.activeSection = section;
    this.sectionChanged.emit(section);
  }

  addStudent(student: Student) {
    console.log('Adding student:', student);
    this.students = [...this.students, student];

    this._snackBar.open('Estudiante añadido correctamente', 'Cerrar', {
      duration: 3000, // 3 segundos
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snackbar-success'] // clase opcional para estilos
    });
  }


  deleteStudent(dni: string) {
    const studentsList = this.students.filter(student => student.dni.toString() !== dni);
    if (studentsList.length < this.students.length) {
      this.students = [...studentsList];
      this._snackBar.open('Estudiante eliminado correctamente', 'Cerrar', {
        duration: 3000, // 3 segundos
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'] // clase opcional para estilos
      });
    } else {
      this._snackBar.open('No se encontró el estudiante a eliminar', 'Cerrar', {
        duration: 3000
      });
    }
  }

  /*
  editStudent(data: { dni: string; updatedStudent: any }) {
    const index = this.students.findIndex(s => s.dni.toString() === data.dni);
    if (index !== -1) {
      this.students[index] = { ...this.students[index], ...data.updatedStudent };
      this.students = [...this.students]; // Trigger change detection
    }
  }*/

  editStudent(data: { dni: string; updatedStudent: any }) {
    const index = this.students.findIndex(s => s.dni.toString() === data.dni);
    if (index !== -1) {
      this.students[index] = { ...this.students[index], ...data.updatedStudent };
      this.students = [...this.students]; // Trigger change detection

      // Notificación de éxito (esquina superior derecha)
      this._snackBar.open('Estudiante actualizado correctamente', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['snackbar-success']
      });
    } else {
      // Notificación de error si no se encuentra
      this._snackBar.open('No se encontró el estudiante para actualizar', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['snackbar-error']
      });
    }
  }

}
