import { ArrowLeftRight } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu';
import Link from 'next/link';
import { Tooltip } from '@radix-ui/react-tooltip';
import { TooltipContent } from '@radix-ui/react-tooltip';
import { TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import UserSettings from './UserSettings';

const Header = async () => {
  return (
    <div className="shadow-sm mx-auto px-4 pt-4 sm:px-6 lg:px-8">
      <header className="flex items-center justify-between text-foreground">
        <div className="flex items-center flex-col sm:flex-row justify-start gap-2">
          <div className="flex flex-col gap-1 items-center">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeftRight className="animate-[wiggle_1s_ease-in-out_infinite]" />
              <span className="text-2xl font-bold">points.credit</span>
            </Link>
            <h4 className="text-xs text-muted-foreground">
              No BS &mdash; just points.
            </h4>
          </div>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  Transfer From&nbsp;&nbsp;
                </NavigationMenuTrigger>
                <NavigationMenuContent className="[&_div]:p-1 [&_div]:whitespace-nowrap">
                  <Link href="/program/american-express">
                    <div>American Express</div>
                  </Link>
                  <Link href="/program/chase">
                    <div>Chase</div>
                  </Link>
                  <Link href="/program/capital-one">
                    <div>Capital One</div>
                  </Link>
                  <Link href="/program/citi">
                    <div>Citi</div>
                  </Link>
                  <Link href="/program/bilt">
                    <div>BILT</div>
                  </Link>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger>
                      <Link href="#">Blog</Link>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <span className="text-xs">Coming soon!</span>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </NavigationMenuItem>
              <NavigationMenuItem className="ml-4">
                <Link href="/referrals">Referrals</Link>
              </NavigationMenuItem>
              {/* <NavigationMenuItem>
              <Link href="/blog" className="px-4 py-2 hover:text-primary">
                Blog
              </Link>
            </NavigationMenuItem> */}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center gap-4">
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger className="text-2xl ml-8">🇺🇸</TooltipTrigger>
              <TooltipContent side="left" sideOffset={16}>
                <span className="text-xs">
                  We currently only support US-based credit cards.
                </span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <UserSettings />
        </div>
      </header>
    </div>
  );
};

export default Header;
