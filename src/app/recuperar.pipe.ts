import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'recuperar',
  standalone: true
})
export class RecuperarPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
