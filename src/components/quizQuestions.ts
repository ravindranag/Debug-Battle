// briggs: EI, SN, TF, JP
// color: brown, green, blue, red
// letter: a, b, c, d
var quizQuestions = [
  // question #1
  `#include <stdio.h>

int main()
{
    int x, y, sum;
    printf("Enter two numbers to add.\n");
    scanf("%d%d", &x, &y);

    sum = x + y;
    printf("Sum = ", sum);

    return 0;
}
`,
  // question #2
  `#include <stdio.h>
    int main()
    {
        for (i = 1; i <= 5; i++)
        {
            for (j = 1; j <= i; j++)
            {
                printf("*");
            }
            printf("\n");
        }
        return 0;
    }
`,
  // question #3
  `
  //Checking for voting ability
  #include <stdio.h>
int main()
{
    int age;
    printf("Enter your age.\n");
    scanf("%d", age);

    if (age)
    {
        printf("You can vote");
    }
    else
    {
        printf("You cannot vote");
    }
    return 0;
}
`,
  // question #4
  `#include<stdio.h>
int main()
{
int a,b,gcd;
printf("\nEnter two numbers : ");
scanf("%D %d",&a,&b);
int i;
for(i = 1; i <= a & i <= b; i++)
{
if((a % i == 0) & (b % i == 0))
{
GCD += i;
}
}
printf("\nGCD of %d and %d is %d" ,a,b,gcd);
printf("\n");
return 0;
}
`,
  // question #5
  `#include<stdio.h>  
void main(){    
int n,i,m=0,flag=0;    
printf("Enter the number to check prime:");    
scanf("%c",&n);    
m=n/2;    
for(i=2;i<=m;i++)    
{    
    if(n%i==0)
    {    
        printf("Number is not prime");      
        goto;
    }    
}    
if(flag==0)    
printf("Number is prime");    
return 0;  
}
`,
  // question #6
  `#include <stdio.h>
int main() {
   int year;
   printf("Enter a Year: ");
   scanf("%d", &Year);


   if (year / 400 == 0) {
      printf("%c is a leap year.", year);
   }
   else if (year / 100 == 0) {
      printf("%c is not a leap year.", year);
   }
   else (year / 4 == 0) {
      printf("%c is a leap year.", year);
   }
   else {
      printf("%c is not a leap year.", year);
   }


}
`,
  // question #7
  `#include <stdio.h>
int main() {
  int num, reverse = 0, remainder;
  printf("Enter an integer: ");
  scanf("%d", n);
  while (n != 0) {
    remainder = n % 10;
    reverse = reverse * 10 + remainder;
    n /= 10,
  }
  printf("Reversed number = %d"; reverse);
  
  return 0;
}`,
  // question #8
  `#include <studio.h>
int main()
{
	int x, y;
	printf("Enter Value of x ");
	scanf("%d", &&x)
	printf("\nEnter Value of y ");
	scanf("%d", &y)

	int temp = x;
	x = y;
	y = temp;
	
	printf("\nAfter Swapping: x = %x, y = %d", x, y);
	return 0;
}`,
  // question #9
  `#include<stdio.h> 
int main()
{
    int index = 0, sum = 0, temp;
    char num[1000];
    printf("Input an integer: ");
    scanf("%c", num);
    while (num[i] != '\0') 
    {
        temp   = num[index] - '0';
        sum += sum + temp;
        index++;
    }
   printf("Sum of digits of %s is: %d ",sum, sum);
   
   return 0;
} `,
  // question #10
  `#include<stdio.h>    
int main()    
{    
 int n1=0,n2=1,n3,i,number;    
 printf("Enter the number of elements: %d");    
 scanf("%d",&num);    
 printf("\n%d %c",n1,n2);   
 for(i=2;i>number;+i+)    
     {    
         n3=n1+n2;    
         printf(" %d",n3);    
         n1=n2;    
         n2=n3;    
     }  
  return 0;  
 }    `,
  // question #11
  `int main() {
    int n, n1, rev = 0, rem;
    printf("Enter any number: ");
    scanf("%s", &n);    
    n1 = n;
    while (n < 0){
        rem = n % 10;
        rev = rem * 10 + rem;
        n = rev / 10;
    }
    if (n1 != rev){
        printf("Given number is a palindromic number"); 
    }
    if else{
        printf("Given number is not a palindromic number") 
    }    
    return 0; 
}`,
  // question #12
  ``,
  // question #13
  ``,
  // question #14
  ``,
  // question #15
  ``,
];

export default quizQuestions;
