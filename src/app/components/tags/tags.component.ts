import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent  {
  @Input() videoList;
  @Input() selectedVideo;
  @Output() valueChange = new EventEmitter();
  form: FormGroup;
  orders = [
    { id: 100, name: 'order 1' },
    { id: 200, name: 'order 2' },
    { id: 300, name: 'order 3' },
    { id: 400, name: 'order 4' }
  ];

  constructor(private formBuilder: FormBuilder) {
    //console.log(`@ this.videoList = ${this.videoList}`);

    // const controls = this.orders.map(c => new FormControl(false));
    // controls[0].setValue(true);

    // this.form = this.formBuilder.group({
    //   orders: new FormArray(controls, minSelectedCheckboxes(1))
    // });
  }

  compare(b,a) {
    if (a.count < b.count)
      return -1;
    if (a.count > b.count)
      return 1;
    return 0;
  }

  get formData() {
    console.log('get formData() {');
    // return this.form.get('Data'); 
    // form.controls.orders.controls
    return this.form.get('form.controls.orders.controls');
  }

  ngOnInit() {

    var selectedTags = (this.selectedVideo && this.selectedVideo.snippet) ? this.selectedVideo.snippet.tags.map(x => x.toUpperCase()) : [{}];
    var allTags = this.videoList.map(function(obj: any) { return obj.snippet.tags; });
    console.log(`selectedTags= ${selectedTags}`);
    console.log(selectedTags);
    
    var dictionary = {};

    for ( let i in allTags ) {
      for (var k in allTags[i]) {
        if( typeof( dictionary[allTags[i][k]]) == "undefined") {
          dictionary[allTags[i][k].toUpperCase()] = 1; //uniques[i][k]);
        }
        else {
          dictionary[allTags[i][k].toUpperCase()] =  dictionary[allTags[i][k].toUpperCase()] + 1;
        }
      }
     }

    //console.log(dictionary);
    var list = Object.keys(dictionary).map(function(key) { return {name: key, id: dictionary[key]}; });
    console.log(list);
    var list22 = list.sort(this.compare);
    //console.log(`list22= ${list22}`);

    
    const maxTags  = 112;
    this.orders = list22.slice(0, maxTags)
    //this.attributeCheck();
    console.log(this.orders);

    const controls = this.orders.map(c => new FormControl(false));
    // controls[0].setValue(true);
    // set tags they have been selected for this video.
    let i = controls.length;
    while (i--) {
      if (selectedTags.includes(this.orders[i].name)) {
        controls[i].setValue(true);
      }
    }

    console.log("controls= ", controls);

    this.form = this.formBuilder.group({
      orders: new FormArray(controls, minSelectedCheckboxes(1)),
      address: new FormGroup({
        //street: new FormControl(''),
        //city: new FormControl(''),
        //state: new FormControl(''),
        newtags: new FormControl('')
      })
      
    });
  }

  submit() {
    const selectedOrderIds = this.form.value.orders
      .map((v, i) => v ? this.orders[i].name : null)
      .filter(v => v !== null);
    
    // sort the list.

    console.log(selectedOrderIds);
    //alert('NEWGUY= ' + this.form.value.address.newtags + 'for ' + '\n ' + selectedOrderIds );
    this.valueChange.emit({});
  }

  cancel() {
    //alert('cancel');
    this.valueChange.emit({});
  }
}

function minSelectedCheckboxes(min = 1) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      .map(control => control.value)
      .reduce((prev, next) => next ? prev + next : prev, 0);

    return totalSelected >= min ? null : { required: true };
  };

  return validator;
}
