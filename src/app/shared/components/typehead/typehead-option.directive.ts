import { Directive, Input, OnInit, TemplateRef } from '@angular/core';

@Directive({ selector: '[appTypeHeadOption]' })
export class TypeHeadOptionDirective implements OnInit {
  @Input('appTypeHeadOption') option: any;
  @Input('appTypeHeadOptionValue') value: any;
  @Input('appTypeHeadOptionFieldDisplay') fieldDisplay: any;
  template: TemplateRef<any>;

  constructor(private readonly templateRef: TemplateRef<any>) {}

  ngOnInit(): void {
   this.template = this.templateRef;
  }
}