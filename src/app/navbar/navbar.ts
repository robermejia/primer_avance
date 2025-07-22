import { Component, ChangeDetectorRef, Output, EventEmitter, inject } from '@angular/core';
import { StudentsTable } from "../students-table/students-table";
import { Student } from '../../shared/entities';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AddForm } from '../add-form/add-form';
import { DeleteForm } from '../delete-form/delete-form';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  imports: [StudentsTable, CommonModule, AddForm, DeleteForm, MatSnackBarModule],
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
  }

  deleteStudent(dni: string) {
    const studentsList = this.students.filter(student => student.dni.toString() !== dni);
    if (studentsList.length < this.students.length) {
      this.students = [...studentsList];
      this._snackBar.open('Estudiante eliminado correctamente', 'Cerrar', {
        duration: 3000
      });
    } else {
      this._snackBar.open('No se encontró el estudiante a eliminar', 'Cerrar', {
        duration: 3000
      });
    }
  }
}
